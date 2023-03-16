const btnInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Create a variable to store the beforeinstallprompt event object.

// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default browser install prompt.
    deferredPrompt = event; // Save the event object to a variable.
    btnInstall.style.display = 'block'; // Show the install button
});

// Implements a click event handler on the `btnInstall` element.
btnInstall.addEventListener('click', async () => {
    console.log('btn was clicked!')
    if (deferredPrompt) { // Checks if it exists, so it does not move forward with an undefinied value.
        try {
            await deferredPrompt.prompt(); // Show the install prompt.
            const choiceResult = await deferredPrompt.userChoice; // Handles the user's choice.
            if (choiceResult.outcome === 'accepted') {
                btnInstall.textContent = 'Installed!';
                console.log('User installed the app');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null; // Resets the deferredPrompt variable.    
        } catch (err) {
            console.error('Error showing install prompt:', err);
        }
    }
});


// Adds a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    btnInstall.style.display = 'none'; // Hides the install button.
    console.log('App was installed:', event);
});
