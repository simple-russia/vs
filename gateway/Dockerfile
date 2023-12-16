FROM mcr.microsoft.com/dotnet/aspnet:6.0 as base
WORKDIR /app
EXPOSE 4999

FROM mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /src
COPY . .
RUN dotnet restore "gateway.csproj"
RUN dotner build "gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "gateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=public /app/publish .
ENTRYPOINT [ "dotnet", "gateway.dll" ]