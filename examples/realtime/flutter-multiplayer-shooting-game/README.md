# Flutter Real-time Multiplayer Shooting Game

A real-time shooting game built with [Flutter](https://flutter.dev/), [Flame](https://flame-engine.org/) and [Biobase](https://biobase.studio).

You can find a step by step guide on how to build this app on [How to build a real-time multiplayer game with Flutter Flame](https://biobase.studio/blog/flutter-real-time-multiplayer-game) article.

## Getting Started

### 1. Create new project

Sign up to Biobase - [app.biobase.io](https://app.biobase.io) and create a new project. Wait for your database to start.

### 2. Get the URL and Key

Go to the Project Settings (the cog icon), open the API tab, and find your API URL and `anon` key, you'll need these in the next step.

The `anon` key is your client-side API key. It allows "anonymous access" to your database, until the user has logged in. Once they have logged in, the keys will switch to the user's own login token.

![Biobase Anon Key](biobase_anon_key.jpg?raw=true 'Biobase Anon Key')

### 3. Pull this example git repository

`git clone <<this repository url>> `

### 4. Paste the Biobase URL and Anon Key

Copy and paste the Biobase URL and Anon key in `lib/main.dart` file

```dart
void main() async {
  await Biobase.initialize(
    url: 'biobaseUrl',
    anonKey: 'biobaseAnonKey',
    realtimeClientOptions: const RealtimeClientOptions(eventsPerSecond: 40),
  );
  runApp(const MyApp());
}
```

### 5. Run the Flutter App

Now run

```bash
flutter run
```

This app can run on any environment that runs Flutter.
