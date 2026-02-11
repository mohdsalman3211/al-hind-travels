#!/bin/bash
# Download high-res images for Hero Section
curl -L -o src/assets/haidan-5cGe_80KuO8-unsplash.jpg "https://unsplash.com/photos/5cGe_80KuO8/download?force=true"
curl -L -o src/assets/sulthan-auliya-rzzS0_pMsD0-unsplash.jpg "https://unsplash.com/photos/rzzS0_pMsD0/download?force=true"
curl -L -o src/assets/daniel-eledut-0dvPFzubryE-unsplash.jpg "https://unsplash.com/photos/0dvPFzubryE/download?force=true"
curl -L -o src/assets/izyan-sultanali-_JBMWUAsbAY-unsplash.jpg "https://unsplash.com/photos/_JBMWUAsbAY/download?force=true"
curl -L -o src/assets/david-syphers-uSVABoyhpNo-unsplash.jpg "https://unsplash.com/photos/uSVABoyhpNo/download?force=true"
curl -L -o src/assets/flyadeal-YQdbb8sF274-unsplash.jpg "https://unsplash.com/photos/YQdbb8sF274/download?force=true"
curl -L -o src/assets/karen-dalton-nk7rQ24o0v8-unsplash.jpg "https://unsplash.com/photos/nk7rQ24o0v8/download?force=true"
curl -L -o src/assets/kenny-rsMfEFFrgqc-unsplash.jpg "https://unsplash.com/photos/rsMfEFFrgqc/download?force=true"
curl -L -o src/assets/bornil-amin-0n_nxr0bMGw-unsplash.jpg "https://unsplash.com/photos/0n_nxr0bMGw/download?force=true"
curl -L -o src/assets/stefan-schwinghammer-d6aouQYeavc-unsplash.jpg "https://unsplash.com/photos/d6aouQYeavc/download?force=true"
curl -L -o src/assets/djonk-creative-AdZ68iA9X08-unsplash.jpg "https://unsplash.com/photos/AdZ68iA9X08/download?force=true"
curl -L -o src/assets/miguel-angel-sanz-S_Vo-umb6yM-unsplash.jpg "https://unsplash.com/photos/S_Vo-umb6yM/download?force=true"
curl -L -o src/assets/shot-by-joe-MFwttEM3ThU-unsplash.jpg "https://unsplash.com/photos/MFwttEM3ThU/download?force=true"
curl -L -o src/assets/md-shafinur-rahman-4-MSW1OwSz4-unsplash.jpg "https://unsplash.com/photos/4-MSW1OwSz4/download?force=true"
curl -L -o src/assets/troy-mortier-aiJhx2KXIhU-unsplash.jpg "https://unsplash.com/photos/aiJhx2KXIhU/download?force=true"
curl -L -o src/assets/lukas-souza-dzdoByQejXc-unsplash.jpg "https://unsplash.com/photos/dzdoByQejXc/download?force=true"
curl -L -o src/assets/vaibhav-arate-AxmvmOryb3A-unsplash.jpg "https://unsplash.com/photos/AxmvmOryb3A/download?force=true"

# Resize these specific images to 2560px width for better quality/size balance
sips -Z 2560 src/assets/saim-munib-OQY3FMo10Us-unsplash.jpg
sips -Z 2560 src/assets/haidan-5cGe_80KuO8-unsplash.jpg
sips -Z 2560 src/assets/sulthan-auliya-rzzS0_pMsD0-unsplash.jpg
sips -Z 2560 src/assets/daniel-eledut-0dvPFzubryE-unsplash.jpg
sips -Z 2560 src/assets/izyan-sultanali-_JBMWUAsbAY-unsplash.jpg
sips -Z 2560 src/assets/david-syphers-uSVABoyhpNo-unsplash.jpg
sips -Z 2560 src/assets/flyadeal-YQdbb8sF274-unsplash.jpg
sips -Z 2560 src/assets/karen-dalton-nk7rQ24o0v8-unsplash.jpg
sips -Z 2560 src/assets/kenny-rsMfEFFrgqc-unsplash.jpg
sips -Z 2560 src/assets/bornil-amin-0n_nxr0bMGw-unsplash.jpg
sips -Z 2560 src/assets/stefan-schwinghammer-d6aouQYeavc-unsplash.jpg
sips -Z 2560 src/assets/djonk-creative-AdZ68iA9X08-unsplash.jpg
sips -Z 2560 src/assets/miguel-angel-sanz-S_Vo-umb6yM-unsplash.jpg
sips -Z 2560 src/assets/shot-by-joe-MFwttEM3ThU-unsplash.jpg
sips -Z 2560 src/assets/md-shafinur-rahman-4-MSW1OwSz4-unsplash.jpg
sips -Z 2560 src/assets/troy-mortier-aiJhx2KXIhU-unsplash.jpg
sips -Z 2560 src/assets/lukas-souza-dzdoByQejXc-unsplash.jpg
sips -Z 2560 src/assets/vaibhav-arate-AxmvmOryb3A-unsplash.jpg
