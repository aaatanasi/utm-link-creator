(function (root) {
  'use strict';
  const normalize = value => String(value ?? '').trim().toLowerCase()
    .normalize('NFKD').replace(/\p{M}/gu,'')
    .replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-+|-+$/g,'');
  function buildUtmLink({destination,brand,season,catalog,source='newsletter',placement=''}) {
    const input = String(destination ?? '').trim();
    if (!/^https?:\/\//i.test(input))
      throw new Error('Enter a full destination URL beginning with https:// or http://.');
    let url;
    try { url = new URL(input); }
    catch { throw new Error('Enter a full destination URL beginning with https:// or http://.'); }
    if (!['https:','http:'].includes(url.protocol) || !url.hostname || url.username || url.password)
      throw new Error('Use an HTTP or HTTPS destination without embedded credentials.');
    const parts=[brand,season,catalog].map(normalize);
    const sourceValue=normalize(source);
    if (parts.some(part=>!part) || !sourceValue)
      throw new Error('Brand, season, catalog type, and UTM source need at least one letter or number.');
    const values={utm_source:sourceValue,utm_medium:'email',utm_campaign:parts.join('_'),utm_content:normalize(placement)};
    Object.entries(values).forEach(([key,val])=>{
      if(val) url.searchParams.set(key,val);
      else url.searchParams.delete(key);
    });
    return url.toString();
  }
  if(typeof module==='object' && module.exports) module.exports={buildUtmLink};
  else root.buildUtmLink=buildUtmLink;
})(globalThis);
