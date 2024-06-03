const button = document.createElement('button');
button.className = 'party';
button.innerHTML += '<svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2967_1690)"><path d="M19.9721 3.40039H10.1797C10.1797 5.79593 12.1608 7.74579 14.5948 7.74579H16.4061V9.44496C16.4061 11.8405 18.3872 13.7904 20.8212 13.7904V4.23605C20.8212 3.76251 20.4533 3.40039 19.9721 3.40039Z" fill="white"></path><path d="M15.1323 8.19141H5.33984C5.33984 10.5869 7.32098 12.5368 9.75494 12.5368H11.5663V14.2638C11.5663 16.6594 13.5474 18.6092 15.9814 18.6092V9.02706C15.9814 8.58138 15.6134 8.19141 15.1323 8.19141Z" fill="white"></path><path d="M10.2925 13.0107H0.5C0.5 15.4063 2.48113 17.3561 4.91509 17.3561H6.72641V19.0553C6.72641 21.4509 8.70755 23.4007 11.1415 23.4007V13.8464C11.1415 13.3729 10.7453 13.0107 10.2925 13.0107Z" fill="white"></path></g></svg><div style="padding-left: 3px;">Start Sprint</div>';

// we will wait a little bit as the UI in Trello usually takes a few to be ready after the dom is loaded
setTimeout(() => {
    const headerButtons = document.querySelectorAll('.js-board-header button');
    const lastButton = headerButtons[headerButtons.length - 1];
    if (lastButton) {
        lastButton.parentElement.insertBefore(button, lastButton)
    } else {
        document.body.appendChild(button);
    }
    button.addEventListener('click', () => {
        handleButtonClick();
    });

    updateUI();
}, 2000);

function triggerConfetti(container) {
    const symbols = ['$', '€', '£', '¥', '₹', '₽', '₿', '฿', '₡', '₫', '₯', '₪', '₮', '₩', '₴', '₺', '₼', '₽', '₾',
        'Eve', 'Gilberto', 'Erik', 'Janne', 'Felipe', 'Aleksi', 'Pauli', 'Joakim', 'Juuso', 'Toni', 'Victor'
    ];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        const symbolsLength = symbols.length;
        confetti.textContent = symbols[Math.floor(Math.random() * symbolsLength)];
        const length = confetti.textContent.length * 10;
        const size = `${length> 20?length: 20}px`;
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.setProperty('--size', `${Math.random() * 20 + 10}px`);
        confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
        confetti.style.setProperty('--offsetX', `${Math.random() * 100 - 100}vw`);
        confetti.style.setProperty('--offsetY', `${button.offsetTop}px`);
        confetti.style.setProperty('--spin', `${Math.random() * 360}deg`);

        const animationDuration = Math.random() * 5000;
        confetti.style.animation = `confetti-animation ${animationDuration}ms ease-out`;

        container.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }
    shakeBoard();
}

function shakeBoard(){
    const targetElement = document.getElementById('board');
    targetElement.classList.add('shake');

    targetElement.addEventListener('animationend', () => {
        targetElement.classList.remove('shake');
        createAndShowLabel();
    }, { once: true });
}

function createAndShowLabel() {
    const label = document.createElement('div');
    label.className = 'we-make-you-pay-label';
    label.textContent = 'We will make You pay ™ 🎉';
    document.body.appendChild(label);

    label.addEventListener('animationend', () => {
        label.remove();
    });
}

function handleButtonClick() {
    if (localStorage.getItem('sprintStart')) {
        if (confirm("Do you want to cancel the sprint?")) {
            localStorage.removeItem('sprintStart');
            localStorage.removeItem('sprintEnd');
            button.innerHTML = '<svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2967_1690)"><path d="M19.9721 3.40039H10.1797C10.1797 5.79593 12.1608 7.74579 14.5948 7.74579H16.4061V9.44496C16.4061 11.8405 18.3872 13.7904 20.8212 13.7904V4.23605C20.8212 3.76251 20.4533 3.40039 19.9721 3.40039Z" fill="white"></path><path d="M15.1323 8.19141H5.33984C5.33984 10.5869 7.32098 12.5368 9.75494 12.5368H11.5663V14.2638C11.5663 16.6594 13.5474 18.6092 15.9814 18.6092V9.02706C15.9814 8.58138 15.6134 8.19141 15.1323 8.19141Z" fill="white"></path><path d="M10.2925 13.0107H0.5C0.5 15.4063 2.48113 17.3561 4.91509 17.3561H6.72641V19.0553C6.72641 21.4509 8.70755 23.4007 11.1415 23.4007V13.8464C11.1415 13.3729 10.7453 13.0107 10.2925 13.0107Z" fill="white"></path></g></svg><div style="padding-left: 3px;">Start Sprint</div>';
        }
    } else {
        startSprint(document.body);
    }
}

function startSprint(container) {
    triggerConfetti(container);

    // let the animation finish
    setTimeout(() => {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 13 * 24 * 60 * 60 * 1000);

        localStorage.setItem('sprintStart', startDate.toISOString());
        localStorage.setItem('sprintEnd', endDate.toISOString());

        updateUI();
    }, 3000);
}

function updateUI() {
    const sprintStart = localStorage.getItem('sprintStart');
    const sprintEnd = localStorage.getItem('sprintEnd');

    if (sprintStart && sprintEnd) {
        const startDate = new Date(sprintStart);
        const endDate = new Date(sprintEnd);
        const currentDate = new Date();

        const timeDiff = endDate - currentDate;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysRemaining >= 0) {
            button.innerHTML = `${daysRemaining} <div style="padding-left: 3px;">days left</div>`;
            button.title = `${daysRemaining} days left`;
        } else {
            button.innerHTML = 'Sprint Ended';
            button.title = 'Sprint Ended';
        }
    }
}

window.addEventListener('load', updateUI);
