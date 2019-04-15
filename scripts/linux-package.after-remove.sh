#!/bin/bash

# Delete the link to the binary
rm -f '/usr/local/bin/${executable}'

# Delete default --portable directory
rm -rf '/opt/${productFilename}/${productFilename}'

# Cleanup
rm -rf '/opt/${productFilename}'
