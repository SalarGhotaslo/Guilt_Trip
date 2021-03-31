# Welcome to Sloth!

## About sloth

This app is built to make getting out of the house and stretching your legs fun.

As we all know, sloth is one of the seven deadly sins. In this case it’s deadly for your sloths!

You start with sloths and a step target for the day. The app tracks your steps by using a pedometer. If your daily target is reached, your snuggle of sloths grows. If you don’t hit your target, a sloth dies!

## What the user is shown based on when they log in and if they hit/miss their targets

When a user logs in for the first time:

- When the user opens the app, they are greeted with a welcome message
- When the user clicks okay on the welcome message they are displayed with their starting sloths, a board at the bottom of the screen (with their statistics to do with steps on it) and a sloth with the info button on it.
- On the stats board at the bottom of the page the user is displayed with: Target steps, remaining steps, current steps whilst app is open and number of sloths they have on the tree.

When the user closes the app and logs back in the same day:

- They will be greeted with a welcome back message.
- The same features listed above will remain the same.

When the user logs in the next day:

- They are greeted with a message to let them know whether or not they hit their target and it will also mention that if you do hit your target, you would have gained a sloth and if you haven't hit your target, you would lose a sloth.
- The user will see a visual representation of how many sloths they have on the tree. Again, if they hit their target, they would have gained a sloth and if they didn't hit their target, they would have killed off a sloth.
- On the stats board the target will also change. If the user doesn't hit their target the previous day, then the target goes down by 100 for that day. If they did hit their target, then the target will increase by 100 steps.

If the user logs back on in 2-4 days:

- The same features apply that have been mentioned above in the 'When the user logs in the next day:', the only difference is this now takes it into an accumulation of what the user has done in the past 2-4 days. e.g. if the user has logged on for the first time in 4 days and on three of the days they hit their target but on one day they didn't, then they will be greeted with a message to say well done for hitting your target and that you have a gained a sloth.

If the user logs back on > 5 days:

- The user must log back in within 5 days of using the app otherwise it's game over and the game then resets for them and all the same features mentioned in 'When a user logs in for the first time:' will be displayed

If a user runs out of sloths:

- If a user has run out of sloths this is because they have continuously not been hitting their targets. This means they will get a message saying it's game over and then the game resets. Again, they will be displayed with the same things that are mentioned witin 'When a user logs in for the first time:'

## Extra features

If the user presses the info button on the sloth:

- The user will be greeted with a information page which will explain how the app/game works

If they click on a sloth:

- The user will be displayed with pop up message to tell you the sloth: name, personality and hobbie. This combination being one of 600 trillion, so each sloth is pretty unique!

What are the random messages floating about?

- These are messages that the sloth is saying to the user. Each message is shown at random locations based on the sloth position and at random times.

What is the picture I can see whilst the page is loading?

- This is the splash screen which shows one of our sloths, once the page is loaded you will be greeted with a message

How unique are the sloth pictures?

- Every 5 sloths a sloth is completely unique and has incredible attention to detail in the design. This is to entice users to try and hit their target more often so they can keep unlocking these unique sloths and are left wondering what kind of sloths they could potentially unlock

- The other sloths are a variation of 8 sloths that repeat up the tree. We thought if each sloth is unique then this won't give the users enough motivation to try and hit that next big target!

### Hope you enjoy the app! Below are instructions on how to use the app

# How to use

### Through Expo - **Recommended**

1. Download the Expo go app on your phone.
2. go to: 'https://expo.io/@hamisharro/projects/Guilt_Trip'.

- scan the QR code on the page to launch the app if navigated to using a web browser.
- Or click open on Expo if navigated to using phone browser.

### Through repository

1. clone repository to local libray.
2. open repository with chosen editor.
3. run `npm i` in the command line to install all required modules.
4. run `expo start` in the command line to run app.
5. either use an IOS simulator on a PC or download Expo go on your phone.

- if you're using a simulator, run using link found on http://localhost:19002/ named either 'Run on Android device/emulator' or 'Run on iOS simulator' depending on which simulator you are using.
- if you're using the Expo go app, use your camera and scan the QR code found on http://localhost:19002/.
