const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

(async () => {
  // Check plantation_sites
  const { data: sites, error: sitesErr } = await supabase
    .from('plantation_sites')
    .select('id')
    .limit(1);

  if (sitesErr) {
    console.error('plantation_sites:', sitesErr.message);
  } else {
    console.log('plantation_sites — OK (rows:', sites.length, ')');
  }

  // Check plantation_media
  const { data: media, error: mediaErr } = await supabase
    .from('plantation_media')
    .select('id')
    .limit(1);

  if (mediaErr) {
    console.error('plantation_media: ', mediaErr.message);
  } else {
    console.log('plantation_media  — OK (rows:', media.length, ')');
  }

  // Check storage bucket
  const { data: files, error: storageErr } = await supabase.storage
    .from('plantation-media')
    .list('', { limit: 1 });

  if (storageErr) {
    console.error('plantation-media bucket:', storageErr.message);
  } else {
    console.log('plantation-media  — OK (bucket accessible)');
  }
})();
