import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CreateButton, DeleteButton,
  EditButton,
  ExportButton,
  FilterButton,
  FilterForm,
  ListContextProvider,
  Pagination,
  ShowButton,
  SortButton,
  TextInput,
  TopToolbar,
  useList,
  UseListValue
} from "react-admin";

export const CardListTemplate = () => {
  /*vtl
  #if (!$card.itemsVariableName)
  const [data, setData] = useState<${card.itemType}[]>([]);
  #end
  */
  /*vtl #if (false)*/ useState(); /*vtl #end */

  const listContext: UseListValue /*vtl<${card.itemType}>*/ = useList({
    /*vtl data: #if ($card.itemsVariableName) ${card.itemsVariableName} #else data #end as Array<${card.itemType}>, */
    /*vtl #if($card.rowsPerPage) perPage: $card.rowsPerPage #end */
  });

  /*vtl #if($card.filterProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply filter to data / dataSource
    console.log(listContext.filterValues);
  }, [listContext.filterValues]);
  /*vtl #end */

  /*vtl #if($card.sortProperties.size() > 0)  */
  useEffect(() => {
    //TODO apply sort payload to data / dataSource
    console.log(listContext.sort);
  }, [listContext.sort]);
  /*vtl #end */

  /*vtl #if ($card.pagination) */
  useEffect(() => {
    //TODO apply paging to data / dataSource
    console.log(listContext.page, listContext.perPage);
  }, [listContext.page, listContext.perPage]);
  /*vtl #end */

  /*vtl
  #if ($card.actions.size() > 0)
    #set($toolbarActionPresent = false)
    #foreach($action in $card.actions)
      #if ($action.id == "create" || $action.id == "export")
        #set($toolbarActionPresent = true)
        #break
      #end
    #end
  #end
  */

  return (
    <ListContextProvider value={listContext}>
      {/*vtl #if ($card.filterProperties.size() > 0
                || $card.sortProperties.size() > 0
                || $toolbarActionPresent) */}
      <TopToolbar>
        {/*vtl #if ($card.filterProperties.size() > 0)*/}
        <FilterForm /*vtl filters={[
          #foreach($property in $card.filterProperties)
            <TextInput source="${property.name}" name="${property.name}" />,
          #end
        ]}*/
        />
        {/*vtl #end */}
        <Stack direction="row">
          {/*vtl #if ($card.sortProperties.size() > 0)*/}
          <SortButton
            fields={
              [
                /*vtl #foreach($property in $card.sortProperties) $sQuote$property.name$sQuote, #end */
              ]
            }
          />
          {/*vtl #end */}
          {/*vtl #if ($card.filterProperties.size() > 0)*/}
          <FilterButton /*vtl filters={[
            #foreach($property in $card.filterProperties)
              <TextInput source="${property.name}" name="${property.name}" />,
            #end
          ]}*/
          />
          {/*vtl #end */}
          {/*vtl #foreach($action in $card.actions) */}
          {/*vtl #if($action.type == 'create') */}
          <CreateButton /*vtl label="$action.label"*/ />
          {/*vtl #elseif ($action.type == 'export') */}
          <ExportButton /*vtl label="$action.label"*/ />
          {/*vtl #end */}
          {/*vtl #end */}
        </Stack>
      </TopToolbar>
      {/*vtl #end */}
      {/*vtl
      {#if($card.itemsVariableName)(${card.itemsVariableName} || [])#else (data || [])#end.map((item =>
      <Card sx={{margin:'12px'}} #if ($card.keyProperty) key={item.$card.keyProperty.name} #end>
        <CardContent>
          #if ($card.titleProperty)
          <Typography component="div" variant="h5">
          {item.${card.titleProperty.name}}
          </Typography>
          #end
          #foreach($property in $card.itemProperties)
          #if (!$property.asTitle)
          <Typography component="div">
            ${property.label}: {item.${property.name}}
          </Typography>
          #end
          #end
        </CardContent>
        #if ($card.actions.size() > 0)
        <CardActions>
          #foreach($action in $card.actions)
          #if ($action.type == 'edit')
          <EditButton label="$action.label" record={item}/>
          #elseif ($action.type == 'show')
          <ShowButton label="$action.label" record={item}/>
          #elseif ($action.type == 'delete')
          <DeleteButton label="$action.label" record={item}/>
          #elseif ($action.type == 'custom')
          <Button>$action.label</Button>
          #end
          #end
        </CardActions>
        #end
      </Card>
      ))}
      */}
      {/*vtl #if ($card.pagination) */}
      <Pagination /*vtl #if($card.rowsPerPage) rowsPerPageOptions={[$card.rowsPerPage]} #end */ />
      {/*vtl #end */}
      {/*vtl #if (false) */}
      <TextInput source="undefined" />
      <Card />
      <CardContent />
      <Typography />
      <CardActions />
      <ShowButton/>
      <EditButton/>
      <DeleteButton/>
      <Button/>
      {/*vtl #end */}
    </ListContextProvider>
  );
};
