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

export const updateEmail = async (user: User, email: string) => {
  await supabase
    .from<UserDetails>('users')
    .update({
      email: email
    })
    .eq('id', user.id);
};

export const updatePlan = async (user: User, plan: number) => {
  await supabase
    .from<UserDetails>('users')
    .update({
      plan: plan
    })
    .eq('id', user.id);
};