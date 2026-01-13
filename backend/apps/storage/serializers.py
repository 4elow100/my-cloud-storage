from rest_framework import serializers
from .models import Folder, File


class CreateFolderSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Folder
        fields = ["name", "parent", "owner"]

    def validate_name(self, value):
        user = self.context["request"].user
        if Folder.objects.filter(owner=user, name=value).exists():
            raise serializers.ValidationError(
                "Папка с таким именем уже существует!"
            )
        return value


class FolderSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ["id", "name", "children", "created_at"]

    def get_children(self, obj):
        children = obj.children.all()
        return FolderSerializer(children, many=True).data


class FileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ["id", "original_name", "file", "folder", "owner", "size", "uploaded_at"]
        read_only_fields = ["id", "original_name", "size", "uploaded_at"]

    def create(self, validated_data):
        uploaded_file = validated_data.pop('file')
        validated_data['original_name'] = uploaded_file.name
        validated_data['size'] = uploaded_file.size
        file_instance = File.objects.create(file=uploaded_file, **validated_data)
        return file_instance
