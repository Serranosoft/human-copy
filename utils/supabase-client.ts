import { supabaseClient, User } from '@supabase/supabase-auth-helpers/nextjs';
import { ProductWithPrice, UserDetails } from 'types';

export const supabase = supabaseClient;

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrice[]
> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data || [];
};

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from<UserDetails>('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};

export const updateUserWords = async (user: User | any, words: number | null) => {
    console.log(user);
    console.log(user.id);
    console.log(words);
    await supabase
      .from<UserDetails>('users')
      .update({
        words: words
      })
      .eq('id', user.id);
  };