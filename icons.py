# Builds the site icons from the company logo (white square, logo at 82%). Google wants a multiple of 48px.
from PIL import Image
import sys
src = Image.open(sys.argv[1]).convert("RGB")
def tile(n, pad=.82):
    s = src.copy(); s.thumbnail((int(n*pad),)*2, Image.LANCZOS)
    t = Image.new("RGB", (n, n), "white"); t.paste(s, ((n-s.width)//2, (n-s.height)//2)); return t
for n in (48, 96, 192, 512): tile(n).save(f"demos/icon-{n}.png", optimize=True)
tile(180, .78).save("demos/apple-touch-icon.png", optimize=True)
tile(256).save("site/favicon.ico", sizes=[(16,16),(32,32),(48,48)])
