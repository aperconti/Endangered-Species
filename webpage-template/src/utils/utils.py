import ast


def clean_bounds(bounds):
    # If the key/value pair exists with the key "bounds"
    if bounds.get("bounds"):
        # 1. Get the "bounds" string (which contains | instead of ,)
        # 2. Replace all pipes with comma
        # 3. Strip all whitespace in case there's any newlines
        # 4. Use ast.literal_eval to "evaluate" the string, and turn it into a list
        # https://docs.python.org/3/library/ast.html#ast.literal_eval
        return ast.literal_eval(bounds.get("bounds").replace("|", ",").strip())
