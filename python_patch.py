from pathlib import Path
path=Path('components/quiz/steps/ResultStep.tsx')
text=path.read_text(encoding='utf-8')
needle='      </div>\r\n\r\n      {/* hist'
if needle not in text:
    needle='      </div>\n\n      {/* hist'
if needle not in text:
    raise SystemExit('needle missing after adjustments')
insert="""      </div>\n\n      <div class=\"mx-auto w-full max-w-md\">\n        <ProductCarousel />\n      </div>\n\n      {/* hist"""
text=text.replace(needle, insert, 1)
path.write_text(text, encoding='utf-8')
