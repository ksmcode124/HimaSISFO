export default function RadialBackground() {
  return (
    <div className="flex gap-x-2 justify-between h-full w-full">
      <div className="bg-[radial-gradient(ellipse_at_left,#81C2FF_0%,#7BBFFF_12%,#D9ECFF_40%,transparent_80%)] w-full h-full opacity-50" />
      <div className="bg-[radial-gradient(ellipse_at_right,#81C2FF_0%,#7BBFFF_12%,#D9ECFF_40%,transparent_80%)] w-full h-full opacity-50" />
    </div>
  )
}