# Start Sprint Button for Trello

This Chrome extension adds a "Start Sprint" button to the Trello UI, allowing users to manage sprints in Trello, which does not have built-in sprint support. The extension includes features such as triggering confetti animations, setting and displaying the remaining days of a sprint, and providing an option to cancel the sprint.

## Features

- **Start Sprint Button**: Adds a "Start Sprint" button to the Trello board header.
- **Confetti Animation**: Triggers a confetti animation when a sprint starts.
- **Sprint Countdown**: Displays the number of days remaining in a 14-day sprint.
- **Cancel Sprint**: Provides an option to cancel the current sprint and reset the button.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vbarzana/start-sprint-btn-trello.git
    ```

2. Open Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" by clicking the toggle switch in the top right corner.

4. Click the "Load unpacked" button and select the directory where you cloned the repository.

## Usage

- Open Trello in your browser.
- Wait for the extension to inject the "Start Sprint" button into the Trello board header.
- Click the "Start Sprint" button to start a new 14-day sprint.
- The button will display the number of days remaining in the sprint.
- Click the button again to cancel the current sprint. A confirmation popup will appear.

## How It Works

1. **Button Creation**: The extension creates a "Start Sprint" button and inserts it into the Trello board header.

2. **Sprint Management**:
    - When the button is clicked, it triggers a confetti animation and calculates the end date of a 14-day sprint (including weekends).
    - The start and end dates are stored in `localStorage`.
    - The button text updates to show the remaining days of the sprint.

3. **Cancel Sprint**:
    - Clicking the button during an active sprint shows a confirmation popup.
    - If confirmed, the sprint data is removed from `localStorage`, and the button is reset.

4. **UI Update**:
    - The remaining days are calculated each time the browser is opened.
    - If the sprint has ended, the button text changes to "Sprint Ended".

Enjoy and have fun managing your sprints in Trello!