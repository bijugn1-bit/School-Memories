import { supabase } from './supabase'

export const signUp = async (email: string, password: string, name: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = () => supabase.auth.signOut()
export const getUser = () => supabase.auth.getUser()
export const getSession = () => supabase.auth.getSession()
