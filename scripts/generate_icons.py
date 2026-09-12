# Developed by Mohammad Asim
import pymupdf

svg_template = """<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#bg)" />
  <circle cx="256" cy="256" r="230" stroke="#d97706" stroke-width="6" fill="none" opacity="0.6"/>
  <!-- Dome silhouette -->
  <path d="M256 100 C180 200 160 330 160 380 L352 380 C352 330 332 200 256 100 Z" fill="#d97706" opacity="0.25"/>
  <text x="256" y="320" text-anchor="middle" font-size="160" fill="#ffffff" font-family="sans-serif" font-weight="bold">ﷺ</text>
  <text x="256" y="440" text-anchor="middle" font-size="36" fill="#fef3c7" font-family="sans-serif" font-weight="bold">سیرتِ مصطفےٰ</text>
</svg>"""

for size, filename in [(192, "public/icon-192.png"), (512, "public/icon-512.png")]:
    content = svg_template.format(size=512)
    doc = pymupdf.open(stream=content.encode("utf-8"), filetype="svg")
    page = doc[0]
    # DPI to get target size
    scale = size / 512.0
    matrix = pymupdf.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=matrix)
    pix.save(filename)
    print(f"Generated {filename} ({size}x{size})")
