#!/bin/sh
source ./env_localization.sh
set -e

FLUTTER_LOCALIZATION_PATH="${LOCALIZATION_PACKAGE_PATH}"
node index.js $EXCEL_LOCALIZATION_FILE_PATH $FLUTTER_LOCALIZATION_PATH
cd example
flutter gen-l10n