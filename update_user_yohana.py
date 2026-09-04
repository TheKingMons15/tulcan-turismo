import re

app_context_path = "frontend/src/context/AppContext.jsx"
with open(app_context_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace INITIAL_USER with Yohana
code = code.replace("name: 'María López'", "name: 'Yohana'")
code = code.replace("email: 'maria.lopez@gmail.com'", "email: 'yohana.tulcan@gmail.com'")

with open(app_context_path, "w", encoding="utf-8") as f:
    f.write(code)

auth_modal_path = "frontend/src/components/screens/AuthModal.jsx"
with open(auth_modal_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace default form values in AuthModal
code = code.replace("useState('maria.lopez@gmail.com')", "useState('yohana.tulcan@gmail.com')")
code = code.replace("useState('tulcan2026')", "useState('yohana2026')")
code = code.replace("useState('María López')", "useState('Yohana')")

with open(auth_modal_path, "w", encoding="utf-8") as f:
    f.write(code)

profile_screen_path = "frontend/src/components/screens/ProfileScreen.jsx"
with open(profile_screen_path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace("María López", "Yohana")

with open(profile_screen_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Updated user Yohana in AppContext, AuthModal, and ProfileScreen successfully.")
