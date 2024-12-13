import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from 'src/schema';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BiobaseService {
  private biobase: SupabaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.biobase = createClient<Database>(
      environment.supabaseUrl,
      environment.biobaseKey
    );
  }

  get session() {
    this.biobase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.biobase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.biobase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.biobase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.biobase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.biobase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.biobase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.biobase.storage.from('avatars').upload(filePath, file);
  }
}
