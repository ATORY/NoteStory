#!/bin/bash

# Link to the binary
ln -sf '/opt/${productFilename}/${executable}' '/usr/local/bin/${executable}'

# Create default --portable directory
mkdir --mode=777 '/opt/${productFilename}/${productFilename}'
