# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build

WORKDIR /source

COPY . .
RUN dotnet restore "./product_service.csproj" --disable-parallel
RUN dotnet publish "./product_service.csproj" -c release -o /app --no-restore


# Serve stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5001

ENTRYPOINT [ "dotnet", "product_service.dll" ]
