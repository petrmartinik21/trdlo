
drop table if exists trdloTwo;
drop type if exists current_status;


create type current_status as enum('in-progress', 'completed');

create table
  trdloTwo (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    name text not null,
    station text not null,
    description text not null,
    solution text not null,
    status current_status default 'in-progress' not null,
    collaborators text array default array[]::varchar[] not null
  );

--   insert into trdloTwo (name, station, description, solution) values ('name-one', 'station-one', 'description-one', 'solution-one') 