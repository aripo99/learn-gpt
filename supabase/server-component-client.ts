import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';
import getSupabaseClientKeys from './get-supabase-client-keys';

/**
 * @name getSupabaseServerComponentClient
 * @description Get a Supabase client for use in the Server Components
 * @param params
 */
const getSupabaseServerComponentClient = cache(
    (
        params = {
            admin: false,
        },
    ) => {
        const keys = getSupabaseClientKeys();

        if (params.admin) {
            const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

            if (!serviceRoleKey) {
                throw new Error('Supabase Service Role Key not provided');
            }

            return createServerClient(keys.url, serviceRoleKey, {
                auth: {
                    persistSession: false,
                },
                cookies: {},
            });
        }

        return createServerClient(keys.url, keys.anonKey, {
            cookies: getCookiesStrategy(),
        });
    },
);

export default getSupabaseServerComponentClient;

function getCookiesStrategy() {
    const cookieStore = cookies();

    return {
        get: (name: string) => {
            return cookieStore.get(name)?.value;
        },
    };
}