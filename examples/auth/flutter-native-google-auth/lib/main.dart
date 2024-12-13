import 'package:flutter/material.dart';
import 'package:myauthapp/screens/login_screen.dart';
import 'package:biobase_flutter/biobase_flutter.dart';

void main() async {
  /// TODO: update Biobase credentials with your own
  await Biobase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_ANON_KEY',
  );
  runApp(const MyApp());
}

final biobase = Biobase.instance.client;

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Auth',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}
