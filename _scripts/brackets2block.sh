#!/bin/bash

posts="../_posts/*"

open_round="\("
close_round="\)"
open_square="\["
close_square="\]"

perl -pi -e "s/\Q${open_round}\E/{% latex %}/g" $posts
perl -pi -e "s/\Q${close_round}\E/{% endlatex %}/g" $posts

perl -pi -e "s/\Q${open_square}\E/{% latex centred %}/g" $posts
perl -pi -e "s/\Q${close_square}\E/{% endlatex %}/g" $posts
