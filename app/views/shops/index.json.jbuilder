json.array!(@shops) do |shop|
  json.extract! shop, :id, :name, :description, :direction, :lat, :lng, :image_url
  json.url shop_url(shop, format: :json)
end
