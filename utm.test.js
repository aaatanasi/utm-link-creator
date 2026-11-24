const {test}=require('node:test');
const assert=require('node:assert/strict');
const {buildUtmLink}=require('./utm');
const fields={destination:'https://example.com/catalog?color=red&color=blue&utm_campaign=old&utm_campaign=older&utm_content=old#looks',brand:'Étoile North',season:'Fall Winter 2027',catalog:'Lookbook'};
test('normalizes labels and preserves unrelated repeated parameters and fragment',()=>{
  const url=new URL(buildUtmLink(fields));
  assert.deepEqual(url.searchParams.getAll('color'),['red','blue']);
  assert.deepEqual(url.searchParams.getAll('utm_campaign'),['etoile-north_fall-winter-2027_lookbook']);
  assert.equal(url.searchParams.get('utm_source'),'newsletter');
  assert.equal(url.searchParams.get('utm_medium'),'email');
  assert.equal(url.searchParams.has('utm_content'),false);
  assert.equal(url.hash,'#looks');
});
test('sets optional placement and custom source',()=>{
  const {searchParams:p}=new URL(buildUtmLink({...fields,source:'Retail Brief',placement:'Hero button'}));
  assert.equal(p.get('utm_source'),'retail-brief');
  assert.equal(p.get('utm_content'),'hero-button');
});
test('rejects bad schemes, missing host, credentials, and untrackable labels',()=>{
  for(const destination of ['javascript:alert(1)','file:///tmp/a','//example.com','https:example.com','https://user:pass@example.com','https://'])
    assert.throws(()=>buildUtmLink({...fields,destination}));
  assert.throws(()=>buildUtmLink({...fields,brand:'!!!'}));
});
