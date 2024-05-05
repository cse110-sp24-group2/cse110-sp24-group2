# Meeting Minutes: Developer Journal Web App Brainstorming

**Date:** 5/4/2024

**Location:** Zoom

**Attendance:** All members

## Agenda

1. User Personas
2. Brainstorming features
3. Development Tools and Workflow
4. ADR
5. Additional Considerations
6. Next Steps

## User Personas

- Adjusted to focus more on developer-based personas.
- Includes developers from various backgrounds: student, business professional, intern, freelancer personas involved in front, back and game dev.
- Each persona has specific needs, but a thing in common is a need for simplistic, intuitive UI for progress tracking, visualization and coordination.

## Brainstorming features

- Proposed features include:
  - Basic CRUD operations for journal entries.
  - Ability to import tasks and labels from other sources.
  - Grouping journals under multiple projects.
  - Customizable view (month/week) and colors based on priority.
  - Progress tracker with GitHub compatibility.
  - Offline functionality for data storage or integration with cloud storage and authentication.
  - Consideration of small screen responsiveness.
  - Adding theme and urgency labels for tasks.
  - Implementing markdown support (need TA permission).

## Development Tools and Workflow

- Utilizing [HTML web storage (local storage)](https://adr.github.io/madr/#create-a-new-adr) for saving data.
- Implementing CI/CD pipeline with tools like Prettier, Jest, Codacy, JSDOC, and Pull Request Approval.
- Testing these tools in a warm-up exercise before full implementation.

## ADR

- Decided on offline web app with Electron JS.
- Calendar view over list with task checkboxes and visual task representations.
- CI/CD pipeline, going to use extensions and GitHub actions in the development process.
- Search functionality within journals vs filtering based on theme and priority labels.

## Additional Considerations

- Ability to add images to entries.
- Ability to customize themes and colors
- Adding animation
- Consideration of compatibility with multiple devices.
- Exploring storage options like Meteor, Nativefier, and WebUI.

## Next Steps

- Develop UI wireframes for the pitch.
- Address display options, GitHub integration, labeling/tagging system.
- Prioritize features based on urgency and theme.
- Begin implementation and testing of core features.

## Meeting Conclusion

The meeting concluded with a clear roadmap for developing the developer journal web app, focusing on user needs and core features.
