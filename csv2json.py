import json
import sys

filename = sys.argv[1]
file_read = open(filename, "r")
file_write = open(filename[:len(filename)-4]+".json", "w") 

coordinates = []
longitude_list = []

lines = file_read.read().splitlines()

#create list of longitudes
longitudes = lines[0].split(",")
for longitude in longitudes[1:]:
  longitude_list.append(longitude)

#create dictionary for every coordinate 
for line in lines[1:]:
  info = line.split(",")
  latitude = info[0]
  count = 0
  for value in info[1:]:
    curr_coordinate = {}
    curr_coordinate["latitude"] = latitude
    curr_coordinate["value"] = value 
    curr_coordinate["longitude"] = longitude_list[count]
    #add to list of coordinates 
    coordinates.append(curr_coordinate)
    count += 1

#dump list of coordinates into file as JSON format, with newline 
json.dump(coordinates, file_write, indent = 0)

file_read.close()
file_write.close()
