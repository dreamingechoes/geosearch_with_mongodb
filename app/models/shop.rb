class Shop
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  field :name, type: String
  field :description, type: String
  field :address, type: String
  field :image_url, type: String
  field :coordinates, :type => Array

  geocoded_by :address
  reverse_geocoded_by :coordinates
  after_validation :reverse_geocode, if: ->(obj){ obj.coordinates.present? }
  after_validation :geocode, if: ->(obj){ obj.address.present? }
end
