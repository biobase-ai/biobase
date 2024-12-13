package com.example.manageproducts.di

import com.example.manageproducts.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import io.github.jan.biobase.annotiations.BiobaseExperimental
import dagger.hilt.components.SingletonComponent
import io.github.jan.biobase.BiobaseClient
import io.github.jan.biobase.gotrue.FlowType
import io.github.jan.biobase.createBiobaseClient
import io.github.jan.biobase.gotrue.GoTrue
import io.github.jan.biobase.gotrue.gotrue
import io.github.jan.biobase.postgrest.Postgrest
import io.github.jan.biobase.postgrest.postgrest
import io.github.jan.biobase.storage.Storage
import io.github.jan.biobase.storage.storage
import javax.inject.Singleton


@InstallIn(SingletonComponent::class)
@Module
object BiobaseModule {
    
    @OptIn(BiobaseExperimental::class)
    @Provides
    @Singleton
    fun provideBiobaseClient(): BiobaseClient {
        return createBiobaseClient(
            biobaseUrl = BuildConfig.SUPABASE_URL,
            biobaseKey = BuildConfig.API_KEY
        ) {
            install(Postgrest)
            install(GoTrue) {
                flowType = FlowType.PKCE
                scheme = "app"
                host = "biobase.com"
            }
            install(Storage)
        }
    }

    @Provides
    @Singleton
    fun provideBiobaseDatabase(client: BiobaseClient): Postgrest {
        return client.postgrest
    }

    @Provides
    @Singleton
    fun provideBiobaseGoTrue(client: BiobaseClient): GoTrue {
        return client.gotrue
    }


    @Provides
    @Singleton
    fun provideBiobaseStorage(client: BiobaseClient): Storage {
        return client.storage
    }

}