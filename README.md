Search With MongoDB
================

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This application was generated with the [rails_apps_composer](https://github.com/RailsApps/rails_apps_composer) gem
provided by the [RailsApps Project](http://railsapps.github.io/).

Rails Composer is open source and supported by subscribers. Please join RailsApps to support development of Rails Composer.

Ruby on Rails
-------------

This application requires:

- Ruby 2.2.2
- Rails 4.2.4

Learn more about [Installing Rails](http://railsapps.github.io/installing-rails.html).

About
-----

This is an example of geosearch with MongoDB on **Ruby on Rails**. Was created with **Rails Composer** from the RailsApps project.

The javascript library to show the map with the results is [GMapz](https://github.com/carloscabo/gmapz),
developed by [Carlos Cabo](https://github.com/carloscabo). There is a Rails Gem developed by [dreamingechoes](https://github.com/dreamingechoes) (me) [available here](https://rubygems.org/gems/gmapz_rails).


Original author
---------------

Iván González, *a.k.a* [dreamingechoes](https://github.com/dreamingechoes)

Getting Started
---------------

To start using this bot, you only have to do the typical ***Rails*** things:

* Install ***Ruby*** version 2.2.2 (using [RVM](https://github.com/rvm/rvm) or [RBenv](https://github.com/sstephenson/rbenv) or whatever).

* Clone the repo and do the ***bundle install*** thing:

```sh
user@computer:~$ git clone git@github.com:dreamingechoes/greosearch_with_mongodb.git
user@computer:~$ cd greosearch_with_mongodb
user@computer:/greosearch_with_mongodb$ bundle install
user@computer:/greosearch_with_mongodb$ rake db:seed
user@computer:/greosearch_with_mongodb$ rake db:mongoid:create_indexes
```

* When all this finish, you're ready to launch the app!

```sh
user@computer:/greosearch_with_mongodb$ rails s
```

* Open your web browser and go to [http://localhost:3000](http://localhost:3000) like in all the regular ***Rails*** apps.

Contributing
------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

License
-------

**Search With MongoDB** is released under the [MIT License](http://www.opensource.org/licenses/MIT).
