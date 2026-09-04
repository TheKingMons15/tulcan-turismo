import re

carto_key = "cb1_2vhd_1_ecbb4873526f384d73614efd"
file_path = "frontend/src/components/map/InteractiveMap.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace tile URLs with key parameter
code = code.replace(
    'url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"',
    f'url: "https://basemaps.cartocdn.com/rastertiles/voyager/{{z}}/{{x}}/{{y}}{{r}}.png?key={carto_key}"'
)

code = code.replace(
    'url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"',
    f'url: "https://basemaps.cartocdn.com/dark_all/{{z}}/{{x}}/{{y}}{{r}}.png?key={carto_key}"'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Updated InteractiveMap.jsx with CARTO API key successfully.")
