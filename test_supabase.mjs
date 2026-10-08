import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://oxnycpedzdquflzvqujl.supabase.co',
  'sb_publishable_jAVYqH-VSeOUjhzs9RDcvg_-Wsm1Xfp'
)

async function testInsert() {
  console.log("Testing insert into team_invitations...")
  const { data, error } = await supabase
    .from('team_invitations')
    .upsert({
      email: 'test@example.com',
      role: 'Editor',
      invited_by: '00000000-0000-0000-0000-000000000000'
    }, { onConflict: 'email' })
    .select()

  console.log("Insert response:")
  console.log({ data, error })

  console.log("\nTesting select from team_invitations...")
  const { data: selectData, error: selectError } = await supabase
    .from('team_invitations')
    .select('*')

  console.log("Select response:")
  console.log({ selectData, selectError })
}

testInsert()
