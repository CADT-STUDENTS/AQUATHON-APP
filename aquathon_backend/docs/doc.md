 
**Race Time Tracker App Specifications**

This app manages races, each with multiple participants and segments, and tracks participant times for race segments.

---

#### 1. Race Management
- **Each race**:
  - Has a `name`, a `dateTime`, and an optional `age range` (defined by nullable `minAge` and `maxAge`). These age constraints are optional and used to determine participant eligibility.
  - Can be in one of three phases:
    - `NOT_STARTED`
    - `STARTED`
    - `FINISHED`
  - **Phase Transitions**:
    - `start()` method:
      - Preconditions: The race must be in the `NOT_STARTED` phase.
      - Postconditions: Sets the race phase to `STARTED`, and sets the race start time (in milliseconds since epoch).
    - `finish()` method:
      - Preconditions: The race must be in the `STARTED` phase.
      - Postconditions: Sets the race phase to `FINISHED`.
    - `reset()` method:
      - Preconditions: The race must be in the `FINISHED` phase.
      - Postconditions: Resets the race to the `NOT_STARTED` phase, clears the race start time, and removes all tracked times for participants.

- **Segments**:
  - A race is composed of segments, which are value objects that represent parts of the race.
  - Each segment has:
    - A `category` (e.g., `BIKE`, `SWIM`, `RUN`, `TRANSITION`, etc.).
    - A `distance` in meters.
  - The **default segment** is a `RUN` segment of `5000` meters.
  - Segments are **immutable** and must implement the `equals` method.
  - Segments are stored in an **ordered list** to define the race sequence.
  - Methods are provided to:
    - Add and remove segments, but at least one segment must remain (an exception is thrown if trying to remove the last segment).
    - Reorder, add, or edit segments **only if the race phase is `NOT_STARTED`**. Attempting to modify segments during the race throws an exception to prevent data inconsistency in tracked times.
    - `canEditSegments()`: Method to check whether segments can be edited.
  
- **Total Distance**:
  - A method calculates the total race distance by summing up the distances of all segments.

#### 2. Participant Management
- **Participants**:
  - Each race has participants with the following attributes:
    - `name`, `dateOfBirth`, `bibNumber`, and `school`.
    - Optionally: `swimCapColor`, `swimLine`, and `schoolName`.
  - It is **not allowed to add a participant with a duplicate bib number**. The `addParticipant` method should throw an exception if a bib number already exists.
  - A `getParticipantFor(bibNumber)` method should return the participant for the given bib or `null` if none is found.
  - The race can **assess eligibility** of a participant using:
    - Age constraints, if defined. The method checks whether the participant's age is within the race's age range.

#### 3. Race Timing and Tracking
- **Start Time**:
  - The race has a nullable `startTime`, set upon the race start. The time is stored in milliseconds since epoch.

- **Tracked Times**:
  - Each race maintains a list of **tracked times**, representing the time participants took for each segment of the race.
  - Tracked times are associated with both a segment and a participant.
  - A **tracked time** can be assigned in two ways:
    - **1-step mode**: The time and the participant's bib are given at the same time.
    - **2-step mode**: The time is given first, and the participant's bib is assigned later.
  - Tracked times are stored in milliseconds since epoch.

- **Race Results**:
  - The race provides a method to retrieve an ordered list of segment-time pairs for a given participant. The time can be `null` if no time was tracked for that segment.
  - A **race result value object** is provided for each participant, containing:
    - The total time of the participant (calculated as the difference between the time of the last segment and the race start time).
    - Times for each segment:
      - Calculated as the difference between the current segment’s time and the previous segment’s time (or the race start time for the first segment).
      - If a time is negative or missing, the result is tagged as invalid.
  