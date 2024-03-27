#!/bin/bash

checkPath() {
    path=$1
    # Check if the path exists
    if [[ -d "$path" ]]; then
        # If the path exists, try to change directory to it
        echo "Path $path exists."
        exit 0
    else
        # If the path does not exist, display an error message
        echo "Path $path does not exist."
        exit 1
    fi
}

checkFileExists() {
    file_path=$1
    if [[ -f $file_path ]]; then
        echo "true"
    else
        echo "false"
    fi
}

copy_file_if_not_exists() {
    source_file=$1
    destination_file=$2
    resultDest=$(checkFileExists $destination_file)
    if [[ $resultDest == "true" ]]; then
       echo "The file $destination_file exists."
       return 1
    fi
    # Copy the file using the cp command
    cp "$source_file" "$destination_file"
    # Check if the copy was successful
    if [ $? -eq 0 ]; then
        echo "File ${source_file} copied successfully!"
    else
        echo "An error occurred while copying the file."
    fi
}

create_folder_if_not_exists() {
    # Specify the folder path to create
    folder_path=$1

    # Check if the folder already exists
    if [[ ! -d "$folder_path" ]]; then
        # Create the folder using mkdir -p to create parent directories if needed
        mkdir -p "$folder_path"

        # Inform the user about the folder creation
        echo "Folder $folder_path created successfully."
    else
        # Inform the user that the folder already exists
        echo "Folder $folder_path already exists."
    fi
}


copy_files_to_folder() {
    read -p "Enter your flutter project path: " path
    path=${path//\'/}
    sourcePath=$PWD
    resuresultProjectPathlt=$(checkPath $path)

    if [[ resuresultProjectPathlt ]]; then
        echo "Welcome project path: $path !!!!!!"
        echo "Source path: $sourcePath !!!!!!!"
        echo "Staring gen localization --- $genFilePath"
        genFilePath=$path
        result=$(checkPath $genFilePath)
        if [[ result ]]; then
            copy_file_if_not_exists "$sourcePath/env_localization.sh" "$genFilePath/env_localization.sh"
            copy_file_if_not_exists "$sourcePath/gen_localization_file.sh" "$genFilePath/gen_localization_file.sh"
        fi
    fi
}
copy_files_to_folder