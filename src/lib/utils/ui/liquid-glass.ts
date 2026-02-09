import { createImageData } from '@/components/ui/Canvas';
import { MotionValue } from 'motion/react';

/**
 * Memastikan kode hanya berjalan di browser.
 */
const isBrowser = typeof window !== 'undefined';

function calculateRefractionProfile(
    glassThickness: number = 200,
    bezelWidth: number = 60,
    bezelHeightFn: (x: number) => number = (x) => x,
    refractiveIndex: number = 1.5,
    samples: number = 128
): number[] {
    const eta = 1 / refractiveIndex;

    function refract(normalX: number, normalY: number): [number, number] | null {
        const dot = normalY;
        const k = 1 - eta * eta * (1 - dot * dot);
        if (k < 0) return null;
        const kSqrt = Math.sqrt(k);
        return [-(eta * dot + kSqrt) * normalX, eta - (eta * dot + kSqrt) * normalY];
    }

    return Array.from({ length: samples }, (_, i) => {
        const x = i / samples;
        const y = bezelHeightFn(x);
        const dx = x < 1 ? 0.0001 : -0.0001;
        const y2 = bezelHeightFn(x + dx);
        const derivative = (y2 - y) / dx;
        const magnitude = Math.sqrt(derivative * derivative + 1);
        const normal: [number, number] = [-derivative / magnitude, -1 / magnitude];
        const refracted = refract(normal[0], normal[1]);

        if (!refracted) return 0;
        const remainingHeight = (y * bezelWidth) + glassThickness;
        return refracted[0] * (remainingHeight / refracted[1]);
    });
}

function generateDisplacementImageData(
    canvasWidth: number,
    canvasHeight: number,
    objectWidth: number,
    objectHeight: number,
    radius: number,
    bezelWidth: number,
    maximumDisplacement: number,
    refractionProfile: number[] = [],
    dpr?: number
) {
    // Proteksi SSR
    if (!isBrowser) return null;

    const devicePixelRatio = dpr ?? window.devicePixelRatio ?? 1;
    
    // Proteksi Integer & Minimal 1px agar tidak crash "0 su"
    const bufferWidth = Math.max(1, Math.floor(canvasWidth * devicePixelRatio));
    const bufferHeight = Math.max(1, Math.floor(canvasHeight * devicePixelRatio));

    const imageData = createImageData(bufferWidth, bufferHeight);
    if (!imageData) return null;

    const neutral = 0xff008080;
    const buffer32 = new Uint32Array(imageData.data.buffer);
    buffer32.fill(neutral);

    const radius_ = radius * devicePixelRatio;
    const bezel = bezelWidth * devicePixelRatio;

    const radiusSquared = radius_ ** 2;
    const radiusPlusOneSquared = (radius_ + 1) ** 2;
    const radiusMinusBezelSquared = (radius_ - bezel) ** 2;

    const objectWidth_ = objectWidth * devicePixelRatio;
    const objectHeight_ = objectHeight * devicePixelRatio;
    const widthBetweenRadiuses = objectWidth_ - radius_ * 2;
    const heightBetweenRadiuses = objectHeight_ - radius_ * 2;

    const objectX = Math.floor((bufferWidth - objectWidth_) / 2);
    const objectY = Math.floor((bufferHeight - objectHeight_) / 2);

    for (let y1 = 0; y1 < objectHeight_; y1++) {
        for (let x1 = 0; x1 < objectWidth_; x1++) {
            const currentY = objectY + y1;
            const currentX = objectX + x1;

            // Safety check boundary
            if (currentY < 0 || currentY >= bufferHeight || currentX < 0 || currentX >= bufferWidth) continue;

            const idx = (currentY * bufferWidth + currentX) * 4;

            const isOnLeftSide = x1 < radius_;
            const isOnRightSide = x1 >= objectWidth_ - radius_;
            const isOnTopSide = y1 < radius_;
            const isOnBottomSide = y1 >= objectHeight_ - radius_;

            const x = isOnLeftSide ? x1 - radius_ : isOnRightSide ? x1 - radius_ - widthBetweenRadiuses : 0;
            const y = isOnTopSide ? y1 - radius_ : isOnBottomSide ? y1 - radius_ - heightBetweenRadiuses : 0;

            const distanceToCenterSquared = x * x + y * y;

            if (distanceToCenterSquared <= radiusPlusOneSquared && distanceToCenterSquared >= radiusMinusBezelSquared) {
                const opacity = distanceToCenterSquared < radiusSquared
                        ? 1
                        : 1 - (Math.sqrt(distanceToCenterSquared) - Math.sqrt(radiusSquared)) /
                             (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

                const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
                const distanceFromSide = radius_ - distanceFromCenter;

                const cos = x / (distanceFromCenter || 1);
                const sin = y / (distanceFromCenter || 1);

                const bezelIndex = Math.min(refractionProfile.length - 1, Math.max(0, ((distanceFromSide / (bezel || 1)) * refractionProfile.length) | 0));
                const distance = refractionProfile[bezelIndex] ?? 0;

                const dX = (-cos * distance) / (maximumDisplacement || 1);
                const dY = (-sin * distance) / (maximumDisplacement || 1);

                imageData.data[idx] = 128 + dX * 127 * opacity;
                imageData.data[idx + 1] = 128 + dY * 127 * opacity;
                imageData.data[idx + 2] = 0;
                imageData.data[idx + 3] = 255;
            }
        }
    }
    return imageData;
}

export const getDisplacementData = (params: any) => {
    const refractionProfile = calculateRefractionProfile(
        params.glassThickness,
        params.bezelWidth,
        params.bezelHeightFn,
        params.refractiveIndex,
        params.samples
    );

    const maximumDisplacement = Math.max(0.1, ...refractionProfile.map((v) => Math.abs(v)));

    const displacementMap = generateDisplacementImageData(
        params.canvasWidth,
        params.canvasHeight,
        params.objectWidth,
        params.objectHeight,
        params.radius,
        params.bezelWidth,
        maximumDisplacement,
        refractionProfile,
        params.dpr
    );

    return {
        displacementMap,
        maximumDisplacement,
    };
};

export function calculateRefractionSpecular(
    objectWidth: number,
    objectHeight: number,
    radius: number,
    bezelWidth: number,
    specularAngle = Math.PI / 3,
    dpr?: number
) {
    if (!isBrowser) return null;

    const devicePixelRatio = dpr ?? window.devicePixelRatio ?? 1;
    const bufferWidth = Math.max(1, Math.floor(objectWidth * devicePixelRatio));
    const bufferHeight = Math.max(1, Math.floor(objectHeight * devicePixelRatio));
    
    const imageData = createImageData(bufferWidth, bufferHeight);
    if (!imageData) return null;

    const specular_vector = [Math.cos(specularAngle), Math.sin(specularAngle)];
    const buffer32 = new Uint32Array(imageData.data.buffer);
    buffer32.fill(0x00000000);

    const radius_ = radius * devicePixelRatio;
    const bezel_ = bezelWidth * devicePixelRatio;

    const radiusSquared = radius_ ** 2;
    const radiusPlusOneSquared = (radius_ + devicePixelRatio) ** 2;
    const radiusMinusBezelSquared = (radius_ - bezel_) ** 2;

    const widthBetweenRadiuses = bufferWidth - radius_ * 2;
    const heightBetweenRadiuses = bufferHeight - radius_ * 2;

    for (let y1 = 0; y1 < bufferHeight; y1++) {
        for (let x1 = 0; x1 < bufferWidth; x1++) {
            const idx = (y1 * bufferWidth + x1) * 4;

            const isOnLeftSide = x1 < radius_;
            const isOnRightSide = x1 >= bufferWidth - radius_;
            const isOnTopSide = y1 < radius_;
            const isOnBottomSide = y1 >= bufferHeight - radius_;

            const x = isOnLeftSide ? x1 - radius_ : isOnRightSide ? x1 - radius_ - widthBetweenRadiuses : 0;
            const y = isOnTopSide ? y1 - radius_ : isOnBottomSide ? y1 - radius_ - heightBetweenRadiuses : 0;

            const distanceToCenterSquared = x * x + y * y;

            if (distanceToCenterSquared <= radiusPlusOneSquared && distanceToCenterSquared >= radiusMinusBezelSquared) {
                const distanceFromCenter = Math.sqrt(distanceToCenterSquared);
                const distanceFromSide = radius_ - distanceFromCenter;

                const opacity = distanceToCenterSquared < radiusSquared
                        ? 1
                        : 1 - (distanceFromCenter - Math.sqrt(radiusSquared)) /
                             (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));

                const cos = x / (distanceFromCenter || 1);
                const sin = -y / (distanceFromCenter || 1);

                const dotProduct = Math.abs(cos * specular_vector[0]! + sin * specular_vector[1]!);
                const coefficient = dotProduct * Math.sqrt(1 - Math.pow(1 - (distanceFromSide / (devicePixelRatio || 1)), 2));

                const color = Math.min(255, 255 * coefficient);
                const finalOpacity = Math.min(255, color * coefficient * opacity);

                imageData.data[idx] = color;
                imageData.data[idx + 1] = color;
                imageData.data[idx + 2] = color;
                imageData.data[idx + 3] = finalOpacity;
            }
        }
    }
    return imageData;
}

export function getValueOrMotion<T>(value: T | MotionValue<T>): T {
    return value instanceof MotionValue ? value.get() : value;
}

// --- Presets ---
export type SurfaceFnDef = { title: string; fn: (x: number) => number };
export const CONVEX_CIRCLE: SurfaceFnDef = { title: 'Convex Circle', fn: (x) => Math.sqrt(1 - (1 - x) ** 2) };
export const CONVEX: SurfaceFnDef = { title: 'Convex Squircle', fn: (x) => Math.pow(1 - Math.pow(1 - x, 4), 1 / 4) };
export const CONCAVE: SurfaceFnDef = { title: 'Concave', fn: (x) => 1 - CONVEX_CIRCLE.fn(x) };
export const LIP: SurfaceFnDef = {
    title: 'Lip',
    fn: (x) => {
        const convex = CONVEX.fn(x * 2);
        const concave = CONCAVE.fn(x) + 0.1;
        const smootherstep = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
        return convex * (1 - smootherstep) + concave * smootherstep;
    },
};
export const WAVE: SurfaceFnDef = {
    title: 'Wave',
    fn: (x) => {
        const base = Math.pow(x, 0.5);
        const wave = Math.sin(x * Math.PI * 3) * 0.1;
        return Math.max(0, Math.min(1, base + wave));
    },
};
export const STEPPED: SurfaceFnDef = {
    title: 'Stepped',
    fn: (x) => {
        const steps = 4;
        const stepSize = 1 / steps;
        const stepIndex = Math.floor(x / stepSize);
        const stepProgress = (x % stepSize) / stepSize;
        const stepHeight = stepIndex / (steps - 1);
        const smoothing = Math.pow(stepProgress, 3) * (stepProgress * (stepProgress * 6 - 15) + 10);
        return stepHeight + smoothing * (1 / (steps - 1));
    },
};
export const ELASTIC: SurfaceFnDef = {
    title: 'Elastic',
    fn: (x) => {
        if (x === 0) return 0;
        if (x === 1) return 1;
        const p = 0.3;
        const s = p / 4;
        return Math.pow(2, -10 * x) * Math.sin(((x - s) * (2 * Math.PI)) / p) + 1;
    },
};
export const BUBBLE: SurfaceFnDef = {
    title: 'Bubble',
    fn: (x) => {
        const center = 0.6;
        const width = 0.4;
        const height = 1.2;
        const distance = Math.abs(x - center) / width;
        if (distance > 1) return 0;
        const bubble = Math.sqrt(1 - distance * distance) * height;
        const base = Math.pow(x, 2);
        return Math.max(0, Math.min(1, Math.max(base, bubble)));
    },
};

export const fns: SurfaceFnDef[] = [CONVEX_CIRCLE, CONVEX, CONCAVE, LIP, WAVE, STEPPED, ELASTIC, BUBBLE];