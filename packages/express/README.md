### sdblog frontend

To import one package modules from another, make sure to add the field **name** in
the ```package.json``` file in all the packages.

Next, add one package as a dependency inside another package's package.json file.

```"@sdblog/entity": "1.0.0",```

Finally run ```yarn```. Now you can sucessfully import modules from one pkg to another.
