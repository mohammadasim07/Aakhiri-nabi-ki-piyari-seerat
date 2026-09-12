# Developed by Mohammad Asim
# Project: Aakhri Nabi Ki Pyari Seerat App
import os
import pymupdf

def export_book(pdf_path, output_dir, label):
    os.makedirs(output_dir, exist_ok=True)
    doc = pymupdf.open(pdf_path)
    total = len(doc)
    print(f"Exporting {label} ({total} pages) to {output_dir}...")
    
    # Use standard content page for base dimensions
    base_page = doc[1] if total > 1 else doc[0]
    base_w = base_page.rect.width
    base_h = base_page.rect.height
    dpi_scale = 140.0 / 72.0
    
    for i, page in enumerate(doc):
        # Scale to match standard page dimensions if page rect differs
        scale_x = (base_w / page.rect.width) * dpi_scale
        scale_y = (base_h / page.rect.height) * dpi_scale
        matrix = pymupdf.Matrix(scale_x, scale_y)
        pix = page.get_pixmap(matrix=matrix)
        out_file = os.path.join(output_dir, f"page_{i+1}.jpg")
        # Save as high-quality JPG
        pix.save(out_file, jpg_quality=85)
        if (i + 1) % 30 == 0 or (i + 1) == total:
            print(f"  {label}: {i+1}/{total} pages exported")
    
    print(f"Completed {label} export!")

if __name__ == "__main__":
    export_book("pdf/aakhri-nabi-ki-piyari-seerat (1).pdf", "public/books/urdu", "Urdu Edition")
    export_book("pdf/aakhri-nabi-ki-piyari-seerat.pdf", "public/books/hindi", "Hindi Edition")
    export_book("pdf/the-sublime-biography-of-last-prophet.pdf", "public/books/english", "English Edition")
