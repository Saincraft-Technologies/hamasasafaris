'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk is used when you interact with the file system without
  | defining a disk name
  |
  */
  default: 'local',

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Local disk interacts with the a local folder inside your application
    |
    */
    local: {
      root: Helpers.tmpPath('./public'),
      driver: 'local'
    },

    /*
    |--------------------------------------------------------------------------
    | S3
    |--------------------------------------------------------------------------
    |
    | S3 disk interacts with a bucket on aws s3
    |
    */
    s3: {
      driver: 's3',
      visibility: 'public',
      key: Env.get('NDOOFUNGUO', 'DO00V66TRWHZXCL8CM48'),
      secret: Env.get('NDOOSIRI', '2oBSgaKqRb6+6ZR0CK7Z1UvUKS3vQGF4JA24C9vCyQ4'),
      bucket: Env.get('NDOO', 'saincrafttechnologies-static-public-2023'),
      region: Env.get('NDOOENEO', 'fra1'),
      endpoint: Env.get('S3ENDPOINT', 'digitaloceanspaces.com')
    }
  }
}
