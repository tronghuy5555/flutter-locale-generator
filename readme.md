#Setup and Usage

1. Please make sure you have a Node.JS Version > 14.0. v16.6.1 or above is the best
2. Run npm install -g .
3. Download the Sample App Localization Sheets file from [here](https://docs.google.com/spreadsheets/d/1D_OmgP9IGB0Aanbhv-AaBcrX4fCj7zTe34I8uiRG4pA/edit?usp=sharing).
4. This script will parse all of the Sheets and Strings in the file and generate the `.arb` files for us (For example: `intl_vi.arb`, `intl_en.arb`)
5. or you can use `gen_localization_file.sh` script but must provide `excel path` and `localization package path` in `env_localization.sh`
   ```bash
    #!/bin/sh
    EXCEL_LOCALIZATION_FILE_PATH=[Your excel path]
    LOCALIZATION_PACKAGE_PATH=[Your localization package path]
    PROJECT_PATH=[Your Flutter project path]  
    ```
