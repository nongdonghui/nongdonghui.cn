#!/bin/bash

languages=( vim python perl ruby yaml css html bash cpp c )
posts="../_posts/*"

for lang in "${languages[@]}"
do
    :
    perl -pi -e "s/highlight $lang/highlight $lang lineanchors/g" $posts
done
