setTimeout(() => {
    (function() {
        'use strict';
 
        const style = document.createElement('style');
        style.innerHTML = `
            .livepeer-video-player_livepeer-video-player__NRXYi .livepeer-video-player_controls__y36El .livepeer-video-player_volume-controls__q9My4,
            .livepeer-video-player_livepeer-video-player__NRXYi .livepeer-video-player_controls__y36El .livepeer-video-player_clipping__GlB4S, .livepeer-video-player_fullscreen__qCmpW {
                display: none !important;
            }
            .luna-menu {
                top: 10px;
                left: 10px;
                background: rgba(25, 29, 33, 1);
                color: white;
                padding: 0px;
                font-size: 14px;
                border-radius: 4px;
                z-index: 5;
                border: 1px solid #505050;
                cursor: default;
            }
            .luna-menu.collapsed #main-menu {
                display: none;
            }
            .luna-menu.collapsed .luna-menu_title {
                border-bottom: none;
            }
            .luna-menu_title {
                font-weight: bold;
                padding: 4px 8px;
                cursor: pointer;
                margin-bottom: 0px;
                background: rgba(116, 7, 0, 1);
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                border-bottom: 1px solid #505050;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .luna-menu_title:hover {
                background-color: #a70a00;
            }
            .luna-menu_item {
                margin: 5px 0;
                padding: 3px;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .luna-menu_item:hover {
                background-color: hsla(0, 0%, 100%, .1);
                color: #f8ec94;
            }
            .luna-hide-scan_lines::after {
                content: none !important;
            }
            .luna-checkbox {
                appearance: none;
                margin-right: 5px;
                width: 20px;
                height: 20px;
                background-color: #303438;
                border: 2px solid black;
                border-radius: 3px;
                position: relative;
            }
            .luna-checkbox:checked {
                background-color: rgba(116, 7, 0, 1);
            }
            .luna-checkbox:checked::after {
                content: '';
                position: absolute;
                left: 3px;
                top: 3px;
                width: 10px;
                height: 10px;
                background-color: #f8ec94;
            }
            .luna-checkbox input:checked + .luna-checkbox::after {
                display: block;
            }
            #toggle-icon {
                transition: transform 0.5s, filter 0.9s;
                --drop-shadow: drop-shadow(2px 3px 0 #000000);
                filter: var(--drop-shadow);
            }
            .luna-menu_title svg {
                margin-left: -3px;
                color: #f8ec94;
            }
            .menu-title-text {
                flex-grow: 1;
                margin-left: 4px;
                padding-left: 0px;
            }
            #toggle-icon {
                transition: transform 0.5s, filter 0.9s;
                --drop-shadow: drop-shadow(2px 3px 0 #000000);
                filter: var(--drop-shadow);
            }
            #custom-volume-slider input[type="range"] {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 8px;
                background: linear-gradient(to right, #740700 0%, #740700 var(--value), #555 var(--value), #555 100%);
                border-radius: 5px;
                outline: none;
            }
 
            #custom-volume-slider input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 1px solid #505050;
                background: #740700;
                cursor: pointer;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }
 
            #custom-volume-slider input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 1px solid #505050;
                background: #740700;
                cursor: pointer;
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
            }
 
            #custom-volume-slider input[type="range"]:hover {
                background: linear-gradient(to right, #740700 0%, #740700 var(--value), #555 var(--value), #555 100%);
            }
            .custom-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(25, 29, 33, 1);
                color: #fff;
                padding: 15px;
                border-radius: 5px;
                border: 4px solid #f8ec94;            
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .custom-toast-message {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .custom-toast-icon svg {
                fill: #fff;
            }
            .custom-toast-close {
                margin-left: auto;
            }          
            .custom-close-button {
                background: none;
                border: none;
                cursor: pointer;
            }
            .custom-close-button svg {
                fill: #fff;
            }                             
        `;
        document.head.appendChild(style);
 
        let blockQualityCheckbox;
 
        function createVolumeSliderWithRecording() {
            const container = document.createElement('div');
            container.id = 'custom-volume-slider';
            container.classList.add('luna-menu');
            container.style.color = '#fff';
 
            const header = document.createElement('div');
            header.classList.add('luna-menu_title');
            header.style.marginBottom = '0px';
 
            header.innerHTML = `
                <svg id="toggle-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 8H5V10H7V12H9V14H11V16H13V14H15V12H17V10H19V8Z" fill="#f8ec94"></path>
                </svg><span class="menu-title-text">Livestream Controls</span>
            `;
 
            container.appendChild(header);
 
            const content = document.createElement('div');
            content.style.display = 'none';
 
            const sliderLabel = document.createElement('span');
            sliderLabel.innerText = 'Volume:';
            sliderLabel.style.marginRight = '10px';
            sliderLabel.style.marginTop = '5px';
            sliderLabel.style.marginLeft = '5px';
 
            const volumeSlider = document.createElement('input');
            volumeSlider.type = 'range';
            volumeSlider.min = '0.00001';
            volumeSlider.max = '1';
            volumeSlider.step = '0.01';
            volumeSlider.value = '1';
            volumeSlider.style.background = '#740700';
            volumeSlider.style.border = '1px solid #505050';
            volumeSlider.style.flex = '1';
            volumeSlider.style.marginRight = '5px';
            volumeSlider.classList.add('custom-volume-slider');

            const storedVolume = localStorage.getItem('volume') || 50;
            volumeSlider.value = storedVolume;

            volumeSlider.addEventListener('input', () => {
                localStorage.setItem('volume', volumeSlider.value);
            });

            volumeSlider.style.setProperty('--value', `${storedVolume}%`);
 
            volumeSlider.addEventListener('input', function() {
                const videoElement = document.querySelector('video[data-livepeer-video]');
                if (videoElement) {
                    videoElement.volume = this.value;
                    videoElement.setAttribute('data-livepeer-volume', Math.round(this.value * 100));
                }
                this.style.background = `linear-gradient(to right, #740700 ${this.value * 100}%, #555 ${this.value * 100}%)`;
            });
 
            volumeSlider.style.background = `linear-gradient(to right, #740700 ${volumeSlider.value * 100}%, #555 ${volumeSlider.value * 100}%)`;
 
            const volumeContainer = document.createElement('div');
            volumeContainer.style.display = 'flex';
            volumeContainer.style.alignItems = 'center';
            volumeContainer.style.width = '100%';
 
            volumeContainer.appendChild(sliderLabel);
            volumeContainer.appendChild(volumeSlider);
 
            const recordingContainer = document.createElement('div');
            recordingContainer.style.display = 'flex';
            recordingContainer.style.justifyContent = 'space-between';
            recordingContainer.style.width = '100%';
            recordingContainer.style.marginTop = '10px';
 
            const startButton = document.createElement('button');
            startButton.innerText = 'Start Recording';
            startButton.style.marginRight = '0px';
            startButton.style.padding = '10px';
            startButton.style.flex = '1';
            startButton.style.fontSize= '10px';
            startButton.style.backgroundColor = '#303438';
            startButton.style.border = '2px solid black';
            startButton.style.borderRight = '1px solid black';
            startButton.style.color = '#fff';
            startButton.style.cursor = 'pointer';
 
            startButton.addEventListener('mouseover', function() {
                startButton.style.color = '#f8ec94';
            });
 
            startButton.addEventListener('mouseout', function() {
                startButton.style.color = '#fff';
            });
 
            const lastMinuteButton = document.createElement('button');
            lastMinuteButton.innerText = 'Record Last Minute';
            lastMinuteButton.style.padding = '0px';
            lastMinuteButton.style.flex = '1';
            lastMinuteButton.style.fontSize= '10px';            
            lastMinuteButton.style.backgroundColor = '#303438';
            lastMinuteButton.style.border = '2px solid black';
            lastMinuteButton.style.borderLeft = '1px solid black';
            lastMinuteButton.style.color = '#fff';
            lastMinuteButton.style.cursor = 'pointer';
 
            lastMinuteButton.addEventListener('mouseover', function() {
                lastMinuteButton.style.color = '#f8ec94';
            });
 
            lastMinuteButton.addEventListener('mouseout', function() {
                lastMinuteButton.style.color = '#fff';
            });
 
            content.appendChild(volumeContainer);
            recordingContainer.appendChild(startButton);
            recordingContainer.appendChild(lastMinuteButton);
            content.appendChild(recordingContainer);
 
            const menuItem = document.createElement('div');
            menuItem.classList.add('luna-menu_item');
 
            blockQualityCheckbox = document.createElement('input');
            blockQualityCheckbox.type = 'checkbox';
            blockQualityCheckbox.id = 'block-quality-checkbox';
            blockQualityCheckbox.classList.add('luna-checkbox');
            blockQualityCheckbox.style.marginTop = '5px';
            blockQualityCheckbox.style.marginLeft = '5px';
 
            const blockQualityLabel = document.createElement('label');
            blockQualityLabel.htmlFor = 'block-quality-checkbox';
            blockQualityLabel.innerText = 'Block Quality';
            blockQualityLabel.style.marginLeft = '3px';
 
            menuItem.appendChild(blockQualityCheckbox);

            menuItem.appendChild(blockQualityLabel);
 
            content.appendChild(menuItem);

            const pipCheckbox = document.createElement('input');
            pipCheckbox.type = 'checkbox';
            pipCheckbox.id = 'pip-checkbox';
            pipCheckbox.classList.add('luna-checkbox');
            pipCheckbox.style.marginTop = '5px';
            pipCheckbox.style.marginLeft = '5px';
            
            const pipLabel = document.createElement('label');
            pipLabel.htmlFor = 'pip-checkbox';
            pipLabel.innerText = 'Picture in Picture';
            pipLabel.style.marginLeft = '3px';
            
            const pipMenuItem = document.createElement('div');
            pipMenuItem.classList.add('luna-menu_item');
            pipMenuItem.appendChild(pipCheckbox);
            pipMenuItem.appendChild(pipLabel);
            
            content.appendChild(pipMenuItem);

            const pipIsChecked = localStorage.getItem('pipCheckbox') === 'true';
            pipCheckbox.checked = pipIsChecked;

            pipCheckbox.addEventListener('change', async () => {
                const videoElement = document.querySelector('video[data-livepeer-video]');
                if (videoElement) {
                    if (pipCheckbox.checked) {
                        try {
                            await videoElement.requestPictureInPicture();
                            console.log('Picture-in-Picture activated.');
                        } catch (error) {
                            console.error('Error activating Picture-in-Picture:', error);
                            pipCheckbox.checked = false;
                        }
                    } else {
                        try {
                            if (document.pictureInPictureElement) {
                                await document.exitPictureInPicture();
                                console.log('Exited Picture-in-Picture.');
                            }
                        } catch (error) {
                            console.error('Error exiting Picture-in-Picture:', error);
                            pipCheckbox.checked = true;
                        }
                    }
                    localStorage.setItem('pipCheckbox', pipCheckbox.checked);
                } else {
                    console.warn('No video element found for Picture-in-Picture.');
                    pipCheckbox.checked = false;
                }
            });            
 
            const isChecked = localStorage.getItem('blockQualityCheckbox') === 'true';
            blockQualityCheckbox.checked = isChecked;
 
            blockQualityCheckbox.addEventListener('change', () => {
                localStorage.setItem('blockQualityCheckbox', blockQualityCheckbox.checked);
            });                  
 
            volumeSlider.addEventListener('input', function() {
                const videoElement = document.querySelector('video[data-livepeer-video]');
                if (videoElement) {
                    videoElement.volume = this.value;
                    videoElement.setAttribute('data-livepeer-volume', Math.round(this.value * 100));
                    console.log(`Volume set to ${this.value}`);
                }
            });
 
            let isRecording = false;
            startButton.addEventListener('click', function() {
                const event = new KeyboardEvent('keydown', {
                    key: 'c',
                    code: 'KeyC',
                    ctrlKey: false,
                    shiftKey: false,
                    altKey: false,
                    metaKey: false,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(event);
 
                isRecording = !isRecording;
                startButton.innerText = isRecording ? 'Stop Recording' : 'Start Recording';
                if (isRecording) {
                    startButton.style.backgroundColor = '#740700';
                    startButton.style.color = '#f8ec94';
                } else {
                    startButton.style.backgroundColor = '#555';
                    startButton.style.color = '#fff';
                }
            });
 
            lastMinuteButton.addEventListener('click', function() {
                const event = new KeyboardEvent('keydown', {
                    key: 'c',
                    code: 'KeyC',
                    ctrlKey: false,
                    shiftKey: true,
                    altKey: false,
                    metaKey: false,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(event);
            });
 
            container.appendChild(content);
 
            const toggleIcon = header.querySelector('#toggle-icon');
 
            header.addEventListener('click', function() {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
 
                const isCollapsed = content.style.display === 'none';
                toggleIcon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
                toggleIcon.style.setProperty('--drop-shadow', isCollapsed ? 'drop-shadow(2px 3px 0 #000000)' : 'drop-shadow(-2px -3px 0 #000000)');
            });
 
 
            return container;
        }
 
        function moveControls() {
            const sidebar = document.querySelector('.home_left__UiQ0z');
            const adsDiv = document.querySelector('.item-generator_item-generator__TCQ9l');
 
            if (!sidebar || !adsDiv) {
                console.log("Sidebar or Ads div not found. Retrying...");
                return;
            }
 
            let customSlider = document.getElementById('custom-volume-slider');
            if (!customSlider) {
                customSlider = createVolumeSliderWithRecording();
                sidebar.insertBefore(customSlider, adsDiv);
            }
 
            const volumeControls = document.querySelector('.livepeer-video-player_volume-controls__q9My4');
            if (volumeControls && !volumeControls.classList.contains('moved')) {
                console.log("Moving volume controls...");
                volumeControls.classList.add('moved');
                volumeControls.style.display = 'none';
            }
 
            const clippingControls = document.querySelector('.livepeer-video-player_clipping__GlB4S');
            if (clippingControls && !clippingControls.classList.contains('moved')) {
                console.log("Moving clipping controls...");
                clippingControls.classList.add('moved');
                clippingControls.style.display = 'none';
            }
 
            hideQualityButton();
        }
 
        function hideQualityButton() {
            const qualityDiv = document.querySelector('.livepeer-video-player_quality__1WPkz');
            if (blockQualityCheckbox.checked && qualityDiv) {
                qualityDiv.style.display = 'none';
                console.log("Quality button hidden.");
            } else if (qualityDiv) {
                qualityDiv.style.display = 'block';
            }
        }
 
        const blockQualityState = JSON.parse(localStorage.getItem('block-quality-checkbox')) || false;
 
        setInterval(moveControls, 100);
 
        blockQualityCheckbox.checked = blockQualityState;
 
        blockQualityCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            localStorage.setItem('block-quality-checkbox', JSON.stringify(isChecked));
            hideQualityButton();
        });
 
        setInterval(hideQualityButton, 100);
 
    })();
}, 3000);
