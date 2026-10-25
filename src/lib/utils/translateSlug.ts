export function translateToSlug(text: string): string {
  return text
    .toLowerCase() // lowercase semua
    .normalize('NFD') // pisahkan accent/diacritics
    .replace(/[\u0300-\u036f]/g, '') // hapus accent
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric jadi dash
    .replace(/^-+|-+$/g, ''); // trim dash di awal/akhir
}
