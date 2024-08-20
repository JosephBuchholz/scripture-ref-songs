
class DatabaseRouter:
    route_app_labels = {"backend", "bible"}

    def db_for_read(self, model, **hints):
        if model._meta.app_label == "backend":
            return "default"
        elif model._meta.app_label == "bible":
            return 'bible'
        
        return None
    
    def db_for_write(self, model, **hints):
        if model._meta.app_label == "backend":
            return "default"
        elif model._meta.app_label == "bible":
            return 'bible'
        
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == "backend" and obj2._meta.app_label == "backend":
            return "default"
        elif obj1._meta.app_label == "bible" and obj2._meta.app_label == "bible":
            return 'bible'
        
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == "backend":
            return "default"
        elif app_label == "bible":
            return None
        
        return None