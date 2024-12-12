#!/usr/bin/env python3
import os
import re

ICONS_DIR = "/Users/xingqiangchen/IECHOR/biobase/packages/icons/src/icons"

def replace_in_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace import statement
    content = re.sub(
        r"import createSupabaseIcon from '\.\./createSupabaseIcon'",
        "import createSupabaseIcon from '../createSupabaseIcon'",
        content
    )
    
    # Replace function calls
    content = re.sub(
        r"createSupabaseIcon\(",
        "createSupabaseIcon(",
        content
    )
    
    # Replace all instances of createSupabaseIcon with createSupabaseIcon
    content = re.sub(
        r"createSupabaseIcon",
        "createSupabaseIcon",
        content
    )
    
    with open(file_path, 'w') as f:
        f.write(content)

def main():
    for filename in os.listdir(ICONS_DIR):
        if filename.endswith('.ts'):
            file_path = os.path.join(ICONS_DIR, filename)
            replace_in_file(file_path)
    
    print("Replacement completed for all icon files.")

if __name__ == "__main__":
    main()
