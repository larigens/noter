const btnInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Create a variable to store the beforeinstallprompt event object.

// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default browser install prompt.
    deferredPrompt = event; // Save the event object to a variable.
    btnInstall.setAttribute('disabled', false) // Make sure the install button is visible when the beforeinstallprompt event fires.
});

// Implements a click event handler on the `btnInstall` element.
btnInstall.addEventListener('click', async () => {
    deferredPrompt; // Show the install prompt.
    if (deferredPrompt) { // Checks if it exists, so it does not move forward with an undefinied value.
        const choiceResult = await deferredPrompt.userChoice; // Handles the user's choice.
        if (choiceResult.outcome === 'accepted') {
            btnInstall.textContent = 'Installed!';
            btnInstall.setAttribute('disabled', true); // Disable the install button.
            console.log('User installed the app');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null; // Resets the deferredPrompt variable.    
    }
});

// Adds a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    btnInstall.textContent = 'Installed!';
    btnInstall.setAttribute('disabled', true); // Disables the install button.
    console.log('App was installed:', event);
});
