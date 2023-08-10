from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

class MongDB_API:
    def __init__(self) -> None:
        uri = "mongodb+srv://kamal:kamal@cluster0.ckharmj.mongodb.net/?retryWrites=true&w=majority"
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        self.db = self.client["BDAT1004"]
        self.collection = self.db["Group_7"]

    def chart1(self):
        #================ Chart 2=========================

        # 8. Country-wise sum of values where trade_type is "Import" excluding trading_partner value "All countries"
        pipeline_country_import = [
            {"$match": {"trade_type": "Import", "trading_partner": {"$ne": "All countries"}}},
            {"$group": {"_id": "$trading_partner", "total_value": {"$sum": "$value"}}}
        ]
        country_import_results = list(self.collection.aggregate(pipeline_country_import))

        # 9. Country-wise sum of values where trade_type is "Export" excluding trading_partner value "All countries"
        pipeline_country_export = [
            {"$match": {"trade_type": "Export", "trading_partner": {"$ne": "All countries"}}},
            {"$group": {"_id": "$trading_partner", "total_value": {"$sum": "$value"}}}
        ]
        country_export_results = list(self.collection.aggregate(pipeline_country_export))

        countries = [entry['_id'] for entry in country_import_results]
        import_labels = [entry['_id'] for entry in country_import_results]
        import_results = [entry['total_value'] for entry in country_import_results]
        export_labels = [entry['_id'] for entry in country_export_results]
        export_results = [entry['total_value'] for entry in country_export_results]


        data = {
            'import_labels': import_labels,
            'import_values': import_results,
            'export_labels': export_labels,
            'export_values':export_results
        }
        return data
    

    def chart2(self):
        # 5. Month-wise sum of values where trade_type is "Trade Balance" excluding trading_partner value "All countries"
        pipeline_trade_balance = [
            {"$match": {"trade_type": "Trade Balance", "trading_partner": {"$ne": "All countries"}}},
            {"$group": {"_id": {"month": {"$month": "$date"}}, "total_value": {"$sum": "$value"}}},
            {"$sort": {"_id.month": 1}}
            
        ]
        trade_balance_results = list(self.collection.aggregate(pipeline_trade_balance))

        months = [entry['_id']['month'] for entry in trade_balance_results]
        values = [entry['total_value'] for entry in trade_balance_results]

        data={
            'labels': months,
            'values': values
        }

        return data
    

    def chart3(self):
        # 6. Country-wise sum of values where trade type is "Export" on monthly basis excluding "All countries"
        pipeline_country_export_monthly = [
            {"$match": {"trade_type": "Export", "trading_partner": {"$ne": "All countries"}}},
            {"$group": {"_id": {"month": {"$month": "$date"}, "country": "$trading_partner"}, "total_value": {"$sum": "$value"}}},
            {"$sort": {"_id.month": 1}}
            
        ]
        country_export_monthly_results = list(self.collection.aggregate(pipeline_country_export_monthly))


        months =list( set([entry['_id']['month'] for entry in country_export_monthly_results] ))
        countries = list(set([entry['_id']['country'] for entry in country_export_monthly_results]))
        print(countries)
        print(months)
        data = {}
        for country in countries:
            data[country] = [ entry['total_value'] for entry in country_export_monthly_results if entry['_id']['country'] == country]

        return data
  

    def chart4(self):
        pipeline_annual_import = [
        {"$match": {"trade_type": "Import", "trading_partner": {"$ne": "All countries"}}},
        {"$group": {"_id": { "country": "$trading_partner", "trade_type": "$trade_type"},
                "total_value": {"$sum": "$value"}}},
        {"$sort": {"_id.year": 1}}

        ]

        pipeline_annual_export = [
            {"$match": {"trade_type": "Export", "trading_partner": {"$ne": "All countries"}}},
            {"$group": {"_id": { "country": "$trading_partner", "trade_type": "$trade_type"},
                        "total_value": {"$sum": "$value"}}},
                {"$sort": {"_id.year": 1}}

        ]
        annual_import_results = list(self.collection.aggregate(pipeline_annual_import))
        annual_export_results = list(self.collection.aggregate(pipeline_annual_export))

        countries = [entry['_id']['country'] for entry in annual_import_results]
        import_data = []
        export_data = []
        for country in countries:    
            import_data.append([entry['total_value'] for entry in annual_import_results if entry['_id']['country'] == country][0])
            export_data.append ([entry['total_value'] for entry in annual_export_results if entry['_id']['country'] == country][0])
            

        data ={
            'countries':countries,
            'Import': import_data,
            'Export': export_data
        }

        return data



    def chart5(self):
        pipeline_import = [
    {"$match": {"trade_type": "Import", "trading_partner": "All countries"}},
    {"$group": {"_id": {"year": {"$year": "$date"}}, "total_value": {"$sum": "$value"}}},
    {"$sort": {"_id.year": 1}}
]
        import_results = list(self.collection.aggregate(pipeline_import))

# 2. Year-wise sum of values where trade-type is "Export" and trading_partner value is "All countries"
        pipeline_export = [
    {"$match": {"trade_type": "Export", "trading_partner": "All countries"}},
    {"$group": {"_id": {"year": {"$year": "$date"}}, "total_value": {"$sum": "$value"}}},
    {"$sort": {"_id.year": 1}}
]
        export_results = list(self.collection.aggregate(pipeline_export))

        years =[entry['_id']['year'] for entry in import_results]
        import_values = [entry['total_value'] for entry in import_results]
        export_values = [entry['total_value'] for entry in export_results]
        data = {
            'labels': years,
            'values': [import_values,export_values]   
        }   
        return data