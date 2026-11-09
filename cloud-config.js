/* Duovino cloud cellars (Supabase). Leave blank to keep progress on this device only.
 * url: the project URL, e.g. https://abcd1234.supabase.co
 * key: the project's anon (public) key. It's meant to be public; the database only allows the two
 *      duovino_ functions (see supabase/duovino.sql), so it can't read anything else.
 */
window.DUOVINO_CLOUD = window.DUOVINO_CLOUD || {
  url: '',
  key: '',
};
