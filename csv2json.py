import json
import sys
import numpy

filename = sys.argv[1]
file_read = open(filename, "r")
file_write = open(filename[:len(filename)-4]+".json", "w") 

coordinates = []
longitude_list = []
median_list = []
num_entries = 0
mean_count = 0
mean_sum = 0
num_output = 0
min_entry = 1000000
max_entry = 0

lines = file_read.read().splitlines()

#find mean, median, max, and min value
for line in lines[1:]:
	info = line.split(",")
	for data in info[1:]:
		test = float(data)	
		if (test == 99999.0):
			num_entries += 1
			continue
		mean_sum += test
		mean_count += 1
		num_entries += 1
		median_list.append(test)
		if (test < min_entry):
			min_entry = test
		if (test > max_entry):
			max_entry = test

mean = float(mean_sum/mean_count)
median = numpy.median(numpy.array(median_list))

#create list of longitudes
longitudes = lines[0].split(",")
for longitude in longitudes[1:]:
	longitude_list.append(longitude)

#create dictionary for every coordinate 
for line in lines[1:]:
	info = line.split(",")
	latitude = info[0]
	longitude_index = 0
	for data in info[1:]:
		value = float(data)
		if (value == 99999.0 or value < mean):
			longitude_index += 1
			continue
		write_value = value/max_entry
		curr_coordinate = {}
		curr_coordinate["latitude"] = latitude
		curr_coordinate["value"] = str(write_value) 
		curr_coordinate["longitude"] = longitude_list[longitude_index]
		#add to list of coordinates 
		coordinates.append(curr_coordinate)
		longitude_index += 1
		num_output += 1

#dump list of coordinates into file as JSON format
json.dump(coordinates, file_write, indent=0)

print("Number of Entries: " + str(num_entries))
print("Mean: " + str(mean))
print("Median: " + str(median))
print("Maximum: " + str(max_entry))
print("Minimum: " + str(min_entry))
print("Number of Output: " + str(num_output))
print("Removed Entries: " + str(num_entries - num_output))

file_read.close()
file_write.close()