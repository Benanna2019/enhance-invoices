@app
enhance-app

@static
prune true

@plugins
enhance/arc-plugin-enhance
enhance/styles-cribsheet
arc-plugin-tailwindcss      # enable the plugin

@tailwindcss                # tailwind plugin options
src src/styles/tailwind.css # tailwind directives
build public/tailwind.css   # compiled tailwindcss output
